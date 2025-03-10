"""Recreate migrations

Revision ID: 165e8b5a9a89
Revises: 
Create Date: 2025-03-09 23:23:28.355582

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '165e8b5a9a89'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('jobs', 'resume_path')
    op.drop_column('jobs', 'cover_letter_path')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('jobs', sa.Column('cover_letter_path', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('jobs', sa.Column('resume_path', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
